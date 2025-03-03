using AutoMapper;
using CarParkingSystem.Core.Entities;
using CarParkingSystem.Core.Features.ParkAreas.Commands.CreateParkArea;
using CarParkingSystem.Core.Features.ParkAreas.Queries.GetAllParkAreas;
using CarParkingSystem.Core.Features.ParkRecords.Queries.GetAllParkRecords;

namespace CarParkingSystem.Core.Mappings
{
    public class GeneralProfile : Profile
    {
        public GeneralProfile()
        {
            CreateMap<ParkArea, GetAllParkAreasViewModel>();
            CreateMap<CreateParkAreaCommand, ParkArea>();
            CreateMap<GetAllParkAreasQuery, GetAllParkAreasParameter>();

            CreateMap<ParkRecord, GetAllParkRecordsViewModel>();
            CreateMap<CreateParkAreaCommand, ParkRecord>();
            CreateMap<GetAllParkRecordsQuery, GetAllParkRecordsParameter>();
        }
    }
}
