using Microsoft.AspNetCore.Mvc;
using PtttApi.Exceptions;
using PtttApi.Trait.Service;

namespace PtttApi.Trait.Controller;


// these are attributes
[ApiController]
[Route("[controller]")] // takes the controller out of the string

public class TraitController : ControllerBase
{
    private readonly ITraitService _traitService;

    public TraitController(ITraitService traitService)
    {
        _traitService = traitService;
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRoomieTraits([FromBody] List<Domain.Trait> traits, Guid id)
    {
        try
        {
            var updatedRoomie = await _traitService.UpdateRoomieTraits(traits, id);
            return Ok(updatedRoomie);
        }
        catch (RoomieNotFoundException exception)
        {
            return NotFound();
        }
    }
    
    [HttpGet("all")]
    public async Task<IActionResult> GetAllTraits()
    {
        var traits = await _traitService.GetAllTraits();
        return Ok(traits);
    }
}