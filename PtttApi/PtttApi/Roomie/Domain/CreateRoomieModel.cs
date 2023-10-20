namespace PtttApi.Domain;

public class CreateRoomieModel
{
    public string ProfileImage { get; set; }
    public string Description { get; set; }
    public List<string> Attributes { get; set; }
}