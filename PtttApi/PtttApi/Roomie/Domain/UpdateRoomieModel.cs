namespace PtttApi.Domain;

public class UpdateRoomieModel
{
    public string ProfileImage { get; set; }
    public string Description { get; set; }
    public List<string> Attributes { get; set; }
}