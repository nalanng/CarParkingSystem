
using CarParkingSystem.Core.Entities;
using CarParkingSystem.Core.Enums;
using System.Threading.Tasks;

namespace CarParkingSystem.Core.Interfaces.Repositories
{
    public interface IParkAreaRepositoryAsync : IGenericRepositoryAsync<ParkArea>
    {
        Task UpdateParkAreaStatus(int id, ParkAreaStatus newStatus);
    }
}
