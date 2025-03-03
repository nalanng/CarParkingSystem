using CarParkingSystem.Core.Interfaces.Repositories;
using FluentValidation;

namespace CarParkingSystem.Core.Features.ParkAreas.Commands.CreateParkArea
{
    public class CreateParkAreaCommandValidator : AbstractValidator<CreateParkAreaCommand>
    {
        private readonly IParkAreaRepositoryAsync parkAreaRepository;

        public CreateParkAreaCommandValidator(IParkAreaRepositoryAsync parkAreaRepository)
        {
            this.parkAreaRepository = parkAreaRepository;

            RuleFor(p => p.Location)
                .NotEmpty().WithMessage("Status is required.");
        }
    }
}