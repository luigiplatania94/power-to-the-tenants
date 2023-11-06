using PtttApi.Db.Entities;

namespace PtttApi.Domain;

public class Roomie
{
    public Roomie(RoomieEntity roomieEntity)
    {
        Id = roomieEntity.Id;
        ProfileImage = roomieEntity.ProfileImage;
        Description = roomieEntity.Description;
        Attributes = roomieEntity.Attributes
            ?.Select(attr=>new RoomieAttribute(attr))
            .ToList();
    }

    public Guid Id { get; set; }
    public string ProfileImage { get; set; }
    public string Description { get; set; }
    public List<RoomieAttribute> Attributes { get; set; }
}
