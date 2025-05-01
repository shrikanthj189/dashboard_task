import uuid
from datetime import datetime
from sqlalchemy import String, Integer, Date, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    __allow_unmapped__ = True


class TimeStamped:
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow, nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow,
        onupdate=datetime.utcnow, nullable=False
    )


class VisitData(Base, TimeStamped):
    __tablename__ = "visit_data"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    date: Mapped[Date] = mapped_column(Date, nullable=False)
    visit_count: Mapped[int] = mapped_column(Integer, nullable=False)
    month: Mapped[str] = mapped_column(String, nullable=False)


class PerpetualData(Base, TimeStamped):
    __tablename__ = "perpetual_data"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    label: Mapped[str] = mapped_column(String, nullable=False)
    user_count: Mapped[int] = mapped_column(Integer, nullable=False)


class ActivePercentage(Base, TimeStamped):
    __tablename__ = "active_percentage"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    total: Mapped[int] = mapped_column(Integer, nullable=False)
    online: Mapped[int] = mapped_column(Integer, nullable=False)
    offline: Mapped[int] = mapped_column(Integer, nullable=False)
