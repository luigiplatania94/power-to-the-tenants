namespace PtttApi.Db.Entities;

public class RoomieEntity
{
    public Guid Id { get; set; }
    public string ProfileImage { get; set; }
    public string Description { get; set; }
    public List<TraitEntity> Traits { get; set; }
}