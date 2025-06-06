from sqlalchemy import Column, Integer, String, Float, DateTime, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import datetime

Base = declarative_base()

class sentimentLog(Base):
    __tablename__ = 'sentiment_log'
    
    id = Column(Integer, primary_key=True, index=True)
    asset = Column(String)
    text = Column(String)
    label = Column(String)
    score = Column(Float)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

engine = create_engine("sqlite:///./sentiment.db", connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

Base.metadata.create_all(bind=engine)