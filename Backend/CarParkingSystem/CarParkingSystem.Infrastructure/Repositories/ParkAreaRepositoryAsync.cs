using CarParkingSystem.Core.Entities;
using CarParkingSystem.Core.Enums;
using CarParkingSystem.Core.Exceptions;
using CarParkingSystem.Core.Interfaces.Repositories;
using CarParkingSystem.Infrastructure.Contexts;
using CarParkingSystem.Infrastructure.Repository;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace CarParkingSystem.Infrastructure.Repositories
{
    public class ParkAreaRepositoryAsync : GenericRepositoryAsync<ParkArea>, IParkAreaRepositoryAsync
    {
        private readonly DbSet<ParkArea> parkAreas;

        public ParkAreaRepositoryAsync(ApplicationDbContext dbContext) : base(dbContext)
        {
            parkAreas = dbContext.Set<ParkArea>();
        }

        public async Task<bool> UpdateParkAreaStatus(int id, ParkAreaStatus newStatus)
        {
            var area = await parkAreas
                .SingleOrDefaultAsync(x => x.Id == id);

            if (area == null)
            {
                throw new EntityNotFoundException($"Parking area with ID {id} not found.", area);
            }

            if (area.Status != newStatus)
            {
                area.Status = newStatus;
                await UpdateAsync(area);
                return true;
            }

            return false;
        }
    }
}
