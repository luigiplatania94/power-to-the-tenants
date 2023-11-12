using Microsoft.AspNetCore.Mvc;
using PtttApi.Attribute.Service;

namespace PtttApi.Attribute.Controller;


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
    
    [HttpGet("all")]
    public async Task<IActionResult> GetAllTraits()
    {
        var traits = await _traitService.GetAllAttribute();
        return Ok(traits);
    }
}