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


    //http get method 
    // GetRoomieById
    [HttpGet("{id}")]
    public Results<Ok<Roomie>, NotFound> GetRoomieById(Guid id)
    {
        var Roomie = _roomieService.GetRoomieById(id);
        
        return Roomie is null ? TypedResults.NotFound() : TypedResults.Ok(Roomie);
    }
}