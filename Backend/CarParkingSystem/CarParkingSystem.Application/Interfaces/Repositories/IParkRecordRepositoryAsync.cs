
using CarParkingSystem.Core.Entities;
using CarParkingSystem.Core.Features.ParkRecords.Queries.GetParkRecordsByUserId;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CarParkingSystem.Core.Interfaces.Repositories
{
    public interface IParkRecordRepositoryAsync : IGenericRepositoryAsync<ParkRecord>
    {
        Task<List<GetParkRecordsByUserIdViewModel>> GetParkRecordsByUserId(string userId);
    }
}
