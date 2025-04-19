using System;

namespace CarParkingSystem.Core.Interfaces
{
    public interface IDateTimeService
    {
        DateTime NowUtc { get; }
        DateTime Now { get; }
    }
}
