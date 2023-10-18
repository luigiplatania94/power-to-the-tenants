namespace PtttApi.Domain;

public class Roomie
{
    public Guid Id { get; set; }
    public string ProfileImage { get; set; }
    public string Description { get; set; }
    public List<string> Attributes { get; set; }
}
