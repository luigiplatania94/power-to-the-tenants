using PtttApi.Trait.DTOs;

namespace PtttApi.Domain;

public class CreateRoomieDTO
{
    public string ProfileImage { get; set; }
    public string Description { get; set; }
    public List<string> Traits { get; set; }
}