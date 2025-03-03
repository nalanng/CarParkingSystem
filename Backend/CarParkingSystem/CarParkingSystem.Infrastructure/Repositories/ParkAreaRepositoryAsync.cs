using CarParkingSystem.Core.Entities;
using CarParkingSystem.Core.Interfaces.Repositories;
using CarParkingSystem.Infrastructure.Contexts;
using CarParkingSystem.Infrastructure.Repository;
using Microsoft.EntityFrameworkCore;

namespace CarParkingSystem.Infrastructure.Repositories
{
    public class ParkAreaRepositoryAsync : GenericRepositoryAsync<ParkArea>, IParkAreaRepositoryAsync
    {
        private readonly DbSet<ParkArea> parkAreas;

        public ParkAreaRepositoryAsync(ApplicationDbContext dbContext) : base(dbContext)
        {
            parkAreas = dbContext.Set<ParkArea>();
        }
    }
}
