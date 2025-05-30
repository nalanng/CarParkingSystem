﻿using CarParkingSystem.Core.Features.ParkRecords.Commands.CreateParkRecord;
using CarParkingSystem.Core.Features.ParkRecords.Commands.UpdateParkRecord;
using CarParkingSystem.Core.Features.ParkRecords.Queries.GetAllParkRecords;
using CarParkingSystem.Core.Features.ParkRecords.Queries.GetParkRecordsByUserId;
using CarParkingSystem.Core.Interfaces;
using CarParkingSystem.Core.Wrappers;
using CarParkingSystem.Hubs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CarParkingSystem.WebApi.Controllers.v1
{
    public class ParkRecordController : BaseApiController
    {
        private readonly IHubContext<DistanceHub> hubContext;

        public ParkRecordController(IHubContext<DistanceHub> hubContext)
        {
            this.hubContext = hubContext;
        }

        [HttpGet]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PagedResponse<IEnumerable<GetAllParkRecordsViewModel>>))]
        public async Task<PagedResponse<IEnumerable<GetAllParkRecordsViewModel>>> Get([FromQuery] GetAllParkRecordsParameter filter)
        {
            return await Mediator.Send(new GetAllParkRecordsQuery() { PageSize = filter.PageSize, PageNumber = filter.PageNumber });
        }

        [HttpGet("UserId")]
        [Authorize]
        public async Task<IActionResult> Get()
        {
            var userId = User.FindFirst("uid")?.Value;

            return Ok(await Mediator.Send(new GetParkRecordsByUserIdQuery() { UserId = userId }));
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post(CreateParkRecordCommand command)
        {
            var userId = User.FindFirst("uid")?.Value;
            command.UserId = userId;

            var response = await Mediator.Send(command);

            if (!response.Succeeded)
            {
                return BadRequest(new { response.Message });
            }

            await this.hubContext.Clients.All.SendAsync("ParkAreaFull", command.LotId);

            return Ok(response);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Put(int id, UpdateParkRecordCommand command)
        {
            if (id != command.Id)
            {
                return BadRequest();
            }
            return Ok(await Mediator.Send(command));
        }
    }
}
