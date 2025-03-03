using AutoMapper;
using CarParkingSystem.Core.Interfaces.Repositories;
using CarParkingSystem.Core.Wrappers;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace CarParkingSystem.Core.Features.ParkRecords.Queries.GetAllParkRecords
{
    public class GetAllParkRecordsQuery : IRequest<PagedResponse<IEnumerable<GetAllParkRecordsViewModel>>>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
    public class GetAllParkRecordsQueryHandler : IRequestHandler<GetAllParkRecordsQuery, PagedResponse<IEnumerable<GetAllParkRecordsViewModel>>>
    {
        private readonly IParkRecordRepositoryAsync parkRecordRepository;
        private readonly IMapper _mapper;
        public GetAllParkRecordsQueryHandler(IParkRecordRepositoryAsync parkRecordRepository, IMapper mapper)
        {
            this.parkRecordRepository = parkRecordRepository;
            _mapper = mapper;
        }

        public async Task<PagedResponse<IEnumerable<GetAllParkRecordsViewModel>>> Handle(GetAllParkRecordsQuery request, CancellationToken cancellationToken)
        {
            var parkRecords = await this.parkRecordRepository.GetPagedReponseAsync(request.PageNumber, request.PageSize);
            var parkRecordsViewModel = _mapper.Map<IEnumerable<GetAllParkRecordsViewModel>>(parkRecords);
            return new PagedResponse<IEnumerable<GetAllParkRecordsViewModel>>(parkRecordsViewModel, request.PageNumber, request.PageSize);
        }
    }
}
