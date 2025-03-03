using CarParkingSystem.Core.Features.ParkAreas.Commands.CreateParkArea;
using CarParkingSystem.Core.Features.ParkAreas.Commands.DeleteParkAreaById;
using CarParkingSystem.Core.Features.ParkAreas.Commands.UpdateParkArea;
using CarParkingSystem.Core.Features.ParkAreas.Queries.GetAllParkAreas;
using CarParkingSystem.Core.Wrappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CarParkingSystem.WebApi.Controllers.v1
{

    [ApiVersion("1.0")]
    public class ParkAreaController: BaseApiController
    {

        [HttpGet]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PagedResponse<IEnumerable<GetAllParkAreasViewModel>>))]
        public async Task<PagedResponse<IEnumerable<GetAllParkAreasViewModel>>> Get([FromQuery] GetAllParkAreasParameter filter)
        {
            return await Mediator.Send(new GetAllParkAreasQuery() { PageSize = filter.PageSize, PageNumber = filter.PageNumber });
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post(CreateParkAreaCommand command)
        {
            var response = await Mediator.Send(command);

            if (!response.Succeeded)
            {
                return BadRequest(new { response.Message });
            }

            return Ok(response);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Put(int id, UpdateParkAreaCommand command)
        {
            if (id != command.Id)
            {
                return BadRequest();
            }
            return Ok(await Mediator.Send(command));
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await Mediator.Send(new DeleteParkAreaByIdCommand { Id = id }));
        }
    }
}
