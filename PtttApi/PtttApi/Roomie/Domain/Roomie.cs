using PtttApi.Db.Entities;

namespace PtttApi.Domain;

public class Roomie
{
    public Roomie(RoomieEntity roomieEntity)
    {
        Id = roomieEntity.Id;
        ProfileImage = roomieEntity.ProfileImage;
        Description = roomieEntity.Description;
        Traits = roomieEntity.Traits
            ?.Select(attr=>new Trait(attr))
            .ToList();
    }

    public Guid Id { get; set; }
    public string ProfileImage { get; set; }
    public string Description { get; set; }
    public List<Trait> Traits { get; set; }
}
