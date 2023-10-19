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


    [HttpPost]
    public ActionResult<Roomie> CreateRoomie([FromBody] CreateRoomieModel model)
    {
        // Input validation can be done here if needed
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Call the service to create the new Roomie
        var createdRoomie = _roomieService.CreateRoomie(model);
        
        // Return a response, indicating success (e.g., 201 Created)
        return CreatedAtAction("GetRoomieById", new { id = createdRoomie.Id }, createdRoomie);
    }


}