from pydantic import BaseModel
from datetime import datetime, date
from typing import List
from uuid import UUID


class VisitDataOut(BaseModel):
    id: UUID
    date: date
    visit_count: int
    month: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class PerpetualDataOut(BaseModel):
    id: UUID
    label: str
    user_count: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class PerpetualResponse(BaseModel):
    total_label: int
    data: List[PerpetualDataOut]


class ActivePercentageOut(BaseModel):
    id: UUID
    total: int
    online: int
    offline: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
