using CarParkingSystem.Core.Entities;
using CarParkingSystem.Core.Features.ParkRecords.Queries.GetAllParkRecords;
using CarParkingSystem.Core.Features.ParkRecords.Queries.GetParkRecordsByUserId;
using CarParkingSystem.Core.Interfaces.Repositories;
using CarParkingSystem.Infrastructure.Contexts;
using CarParkingSystem.Infrastructure.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace CarParkingSystem.Infrastructure.Repositories
{
    public class ParkRecordRepositoryAsync : GenericRepositoryAsync<ParkRecord>, IParkRecordRepositoryAsync
    {
        private readonly DbSet<ParkRecord> parkRecords;

        public ParkRecordRepositoryAsync(ApplicationDbContext dbContext) : base(dbContext)
        {
            parkRecords = dbContext.Set<ParkRecord>();
        }

        public async Task<List<GetParkRecordsByUserIdViewModel>> GetParkRecordsByUserId(string userId)
        {
            var culture = new CultureInfo("en-US");

            var records = await parkRecords
              .Where(x => x.UserId == userId)
              .ToListAsync();


            return records.Select(x => new GetParkRecordsByUserIdViewModel
            {
                Id = x.Id,
                UserId = userId,
                StartTime = x.StartTime,
                EndTime = x.EndTime,
                Fee = CalculateTotalFee(x.StartTime, x.EndTime, x.Fee),
                StatusId = x.StatusId
            }).ToList();
        }

        private decimal CalculateTotalFee(DateTime startTime, DateTime? endTime, decimal baseFee)
        {
            var hourlyRate = 100;

            if (endTime == null)
                return baseFee;

            var duration = endTime.Value - startTime;
            var totalHours = duration.TotalHours;
            var additionalFee = Math.Ceiling((decimal)totalHours * hourlyRate);

            return baseFee + additionalFee;
        }

    }
}
