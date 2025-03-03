using CarParkingSystem.Core.Interfaces;
using System;

namespace CarParkingSystem.Infrastructure.Services
{
    public class DateTimeService : IDateTimeService
    {
        public DateTime NowUtc => DateTime.UtcNow;
    }
}
