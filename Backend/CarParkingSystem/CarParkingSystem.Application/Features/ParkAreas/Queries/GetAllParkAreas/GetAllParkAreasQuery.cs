using AutoMapper;
using MediatR;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Threading;
using CarParkingSystem.Core.Features.ParkAreas.Queries.GetAllParkAreas;
using CarParkingSystem.Core.Wrappers;
using CarParkingSystem.Core.Interfaces.Repositories;

namespace CarParkingSystem.Core.Features.ParkAreas.Queries.GetAllParkAreas
{
    public class GetAllParkAreasQuery : IRequest<PagedResponse<IEnumerable<GetAllParkAreasViewModel>>>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
    public class GetAllParkAreasQueryHandler : IRequestHandler<GetAllParkAreasQuery, PagedResponse<IEnumerable<GetAllParkAreasViewModel>>>
    {
        private readonly IParkAreaRepositoryAsync parkAreaRepository;
        private readonly IMapper _mapper;
        public GetAllParkAreasQueryHandler(IParkAreaRepositoryAsync parkAreaRepository, IMapper mapper)
        {
            this.parkAreaRepository = parkAreaRepository;
            _mapper = mapper;
        }

        public async Task<PagedResponse<IEnumerable<GetAllParkAreasViewModel>>> Handle(GetAllParkAreasQuery request, CancellationToken cancellationToken)
        {
            var parkAreas = await this.parkAreaRepository.GetPagedReponseAsync(request.PageNumber, request.PageSize);
            var parkAreasViewModel = _mapper.Map<IEnumerable<GetAllParkAreasViewModel>>(parkAreas);
            return new PagedResponse<IEnumerable<GetAllParkAreasViewModel>>(parkAreasViewModel, request.PageNumber, request.PageSize);
        }
    }
}
