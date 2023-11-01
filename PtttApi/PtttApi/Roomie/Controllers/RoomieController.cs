using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using PtttApi.Domain;
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
    public ActionResult CreateRoomie([FromBody] CreateRoomieModel model)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        
        _roomieService.CreateRoomie(model);
        
        return Ok(); // Return a 200 OK response if the post was successful
    }
    

    [HttpPut("{id}")]
    public ActionResult<Roomie> UpdateRoomie(Guid id, [FromBody] UpdateRoomieModel model)
    {
        // if (!ModelState.IsValid) return BadRequest(ModelState);
        //
        // var existingRoomie = _roomieService.GetRoomieById(id);
        // if (existingRoomie is null) return NotFound();
        //
        // existingRoomie = _roomieService.UpdateRoomie(existingRoomie, model);
        
        // return Ok(existingRoomie); // Return a 200 OK response if the update was successful
        return Ok(); // Return a 200 OK response if the update was successful
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRoomie(Guid id)
    {
        var existingRoomie = await _roomieService.GetRoomieById(id);

        if (existingRoomie is null)
            return NotFound();

        await _roomieService.DeleteRoomie(id);

        return Ok();
    }

}

