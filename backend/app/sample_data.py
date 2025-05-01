import uuid
from datetime import date, datetime, timedelta
from sqlalchemy.orm import Session
from models import Base, VisitData, PerpetualData, ActivePercentage
from database import SessionLocal, engine
import calendar

Base.metadata.create_all(bind=engine)


def add_visit_data_for_month(session: Session, year: int, month: int):
    month_name = calendar.month_name[month]
    month_label = f"{month_name} {year}"

    # Check if data for this month already exists
    existing = session.query(VisitData).filter(VisitData.month == month_label).first()
    if existing:
        print(f"⚠️ Visit data for {month_label} already exists, skipping.")
        return

    days_in_month = calendar.monthrange(year, month)[1]
    base_date = date(year, month, 1)

    for i in range(days_in_month):
        visit = VisitData(
            id=uuid.uuid4(),
            date=base_date + timedelta(days=i),
            visit_count=100 + i * 2,
            month=month_label,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        )
        session.add(visit)


def seed_data():
    session: Session = SessionLocal()

    try:
        # --- VisitData for all months except March 2020 ---
        for year in [2020, 2021]:
            for month in range(1, 13):
                add_visit_data_for_month(session, year, month)

        # --- Sample PerpetualData ---
        sources = [
            ("Google.com Inc", 3540),
            ("Recommended Flow", 1450),
            ("Other", 650),
        ]
        for label, count in sources:
            exists = (
                session.query(PerpetualData)
                .filter(PerpetualData.label == label)
                .first()
            )
            if not exists:
                session.add(
                    PerpetualData(
                        id=uuid.uuid4(),
                        label=label,
                        user_count=count,
                        created_at=datetime.utcnow(),
                        updated_at=datetime.utcnow(),
                    )
                )
            else:
                print(f"⚠️ Perpetual data for '{label}' already exists, skipping.")

        # --- Sample ActivePercentage ---
        if not session.query(ActivePercentage).first():
            session.add(
                ActivePercentage(
                    id=uuid.uuid4(),
                    total=1000,
                    online=750,
                    offline=250,
                    created_at=datetime.utcnow(),
                    updated_at=datetime.utcnow(),
                )
            )
        else:
            print("⚠️ ActivePercentage already exists, skipping.")

        session.commit()
        print("✅ Sample data inserted successfully.")

    except Exception as e:
        session.rollback()
        print(f"❌ Error occurred: {e}")
    finally:
        session.close()


if __name__ == "__main__":
    seed_data()
