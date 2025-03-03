
using AutoMapper;
using CarParkingSystem.Core.Exceptions;
using CarParkingSystem.Core.Interfaces.Repositories;
using CarParkingSystem.Core.Wrappers;
using MediatR;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Threading;

namespace CarParkingSystem.Core.Features.ParkRecords.Queries.GetParkRecordsByUserId
{
    public class GetParkRecordsByUserIdQuery : IRequest<Response<List<GetParkRecordsByUserIdViewModel>>>
    {
        public string UserId { get; set; }

        public class GetParkRecordsByUserIdQueryHandler : IRequestHandler<GetParkRecordsByUserIdQuery, Response<List<GetParkRecordsByUserIdViewModel>>>
        {
            private readonly IParkRecordRepositoryAsync parkRecordRepository;
            private readonly IMapper mapper;

            public GetParkRecordsByUserIdQueryHandler(IParkRecordRepositoryAsync parkRecordRepository, IMapper mapper)
            {
                this.parkRecordRepository = parkRecordRepository;
                this.mapper = mapper;
            }

            public async Task<Response<List<GetParkRecordsByUserIdViewModel>>> Handle(GetParkRecordsByUserIdQuery request, CancellationToken cancellationToken)
            {
                var recordsViewModel = await this.parkRecordRepository.GetParkRecordsByUserId(request.UserId);
                if (recordsViewModel == null) throw new ApiException($"Park record not Found.");

                return new Response<List<GetParkRecordsByUserIdViewModel>>(recordsViewModel);
            }
        }

    }
}
