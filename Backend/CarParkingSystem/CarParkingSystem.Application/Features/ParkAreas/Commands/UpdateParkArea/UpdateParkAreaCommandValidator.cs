
using CarParkingSystem.Core.Interfaces.Repositories;
using FluentValidation;

namespace CarParkingSystem.Core.Features.ParkAreas.Commands.UpdateParkArea
{
    public class UpdateParkAreaCommandValidator : AbstractValidator<UpdateParkAreaCommand>
    {
        private readonly IParkAreaRepositoryAsync parkAreaRepository;

        public UpdateParkAreaCommandValidator(IParkAreaRepositoryAsync parkAreaRepository)
        {
            this.parkAreaRepository = parkAreaRepository;

            RuleFor(pa => pa.Status)
                .NotEmpty().WithMessage("Status is required.")
                .NotNull();
        }
    }
}
