using MediatR;
using System.Threading.Tasks;
using System.Threading;
using CarParkingSystem.Core.Enums;
using CarParkingSystem.Core.Wrappers;
using CarParkingSystem.Core.Interfaces.Repositories;
using CarParkingSystem.Core.Exceptions;

namespace CarParkingSystem.Core.Features.ParkAreas.Commands.UpdateParkArea
{
    public class UpdateParkAreaCommand : IRequest<Response<int>>
    {
        public int Id { get; set; }
        public ParkAreaStatus Status { get; set; }

        public class UpdateParkAreaCommandHandler : IRequestHandler<UpdateParkAreaCommand, Response<int>>
        {
            private readonly IParkAreaRepositoryAsync parkAreaRepository;

            public UpdateParkAreaCommandHandler(IParkAreaRepositoryAsync parkAreaRepository)
            {
                this.parkAreaRepository = parkAreaRepository;
            }

            public async Task<Response<int>> Handle(UpdateParkAreaCommand command, CancellationToken cancellationToken)
            {
                var parkArea = await this.parkAreaRepository.GetByIdAsync(command.Id);
                if (parkArea == null) throw new EntityNotFoundException("park area", command.Id);

                parkArea.Status = command.Status;

                await parkAreaRepository.UpdateAsync(parkArea);
                return new Response<int>(parkArea.Id);
            }
        }
    }
}
