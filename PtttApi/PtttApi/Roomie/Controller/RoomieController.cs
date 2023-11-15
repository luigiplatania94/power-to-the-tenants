using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using PtttApi.Domain;
using PtttApi.Exceptions;
using PtttApi.Services;

namespace PtttApi.Controllers;

// these are attributes
[ApiController]
[Route("[controller]")] // takes the controller out of the string
public class RoomieController : ControllerBase
{
    private readonly IRoomieService _roomieService;
    public RoomieController(IRoomieService roomieService)
    {
        _roomieService = roomieService;
    }


    [HttpGet("{id}")]
    public async Task<IActionResult> GetRoomieById(Guid id)
    {
        var roomie = await _roomieService.GetRoomieById(id);
        return roomie is null ? NotFound() : Ok(roomie);
    }

    [HttpGet("all")]
    public async Task<IActionResult> GetAllRoomies()
    {
        var roomies = await _roomieService.GetAllRoomies();
        return Ok(roomies);
    }
    

    [HttpPost]
    public async Task<IActionResult> CreateRoomie([FromBody] CreateRoomieDTO dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        
        var createdRoomie = await _roomieService.CreateRoomie(dto);
        
        return Ok(createdRoomie); // Return a 200 OK response if the post was successful
    }
    

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRoomie(Guid id, [FromBody] UpdateRoomieDTO dto)
    {
        try
        {
            var updatedRoomie = await _roomieService.UpdateRoomie(id, dto);
            return Ok(updatedRoomie);
        }
        catch (RoomieNotFoundException exception)
        {
            return NotFound();
        }
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRoomie(Guid id)
    {
        try
        {
            await _roomieService.DeleteRoomie(id);
            return Ok();
        }
        catch (RoomieNotFoundException exception)
        {
            return NotFound();
        }
    }
}

