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
    public Results<Ok<Roomie>, NotFound> GetRoomieById(Guid id)
    {
        var roomie = _roomieService.GetRoomieById(id);

        return roomie is null ? TypedResults.NotFound() : TypedResults.Ok(roomie);
    }

    [HttpGet("all")]
    public ActionResult<IEnumerable<Roomie>> GetAllRoomies()
    {
        var roomies = _roomieService.GetAllRoomies();
        return Ok(roomies);
    }

    

    [HttpPost]
    public ActionResult<Roomie> CreateRoomie([FromBody] CreateRoomieModel model)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        
        var createdRoomie = _roomieService.CreateRoomie(model);
        
        // Return a response, indicating success (e.g., 201 Created)
        return CreatedAtAction("GetRoomieById", new { id = createdRoomie.Id }, createdRoomie);
    }
    

    [HttpPut("{id}")]
    public ActionResult<Roomie> UpdateRoomie(Guid id, [FromBody] UpdateRoomieModel model)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        
        var existingRoomie = _roomieService.GetRoomieById(id);
        if (existingRoomie is null) return NotFound();
        
        existingRoomie.ProfileImage = model.ProfileImage;
        existingRoomie.Description = model.Description;
        existingRoomie.Attributes = model.Attributes;
        
        return Ok(existingRoomie); // Return a 200 OK response if the update was successful
    }
    
    [HttpDelete("{id}")]
    public IActionResult DeleteRoomie(Guid id)
    {
        var existingRoomie = _roomieService.GetRoomieById(id);
        if (existingRoomie is null) return NotFound();

        _roomieService.DeleteRoomie(id);

        // Return a 204 No Content response to indicate a successful deletion
        return NoContent();
    }
}

