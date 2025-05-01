from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import VisitData, PerpetualData, ActivePercentage
from app.schemas import (
    VisitDataOut,
    ActivePercentageOut,
    PerpetualResponse,
)
from typing import List, Optional
from datetime import datetime


router = APIRouter()


@router.get("/dashboard/visits/", response_model=List[VisitDataOut])
def get_visits(
    month: Optional[str] = Query(
        None, description="Month in format YYYY-MM (e.g., 2020-03)"
    ),
    db: Session = Depends(get_db),
):
    query = db.query(VisitData)

    if month:
        try:
            # Parse YYYY-MM and convert to "Month YYYY"
            parsed_date = datetime.strptime(month, "%Y-%m")
            formatted_month = f"{parsed_date.strftime('%B')} {parsed_date.year}"
        except ValueError:
            raise HTTPException(
                status_code=400, detail="Invalid month format. Use YYYY-MM."
            )

        query = query.filter(VisitData.month == formatted_month)

    return query.order_by(VisitData.date.asc()).all()


@router.get("/dashboard/perpetual/", response_model=PerpetualResponse)
def get_perpetual_data(db: Session = Depends(get_db)):
    data = db.query(PerpetualData).all()
    total = sum(item.user_count for item in data)

    return {"total_label": total, "data": data}


@router.get("/dashboard/active/", response_model=ActivePercentageOut)
def get_active_percentage(db: Session = Depends(get_db)):
    return db.query(ActivePercentage).first()
