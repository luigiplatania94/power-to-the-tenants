namespace PtttApi.Domain;

public class CreateRoomieDTO
{
    public string ProfileImage { get; set; }
    public string Description { get; set; }
    public List<RoomieAttribute> Attributes { get; set; }
}