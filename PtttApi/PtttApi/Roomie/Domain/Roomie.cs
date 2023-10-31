using PtttApi.Db.Entities;

namespace PtttApi.Domain;

public class Roomie
{
    public Roomie(RoomieEntity roomieEntity)
    {
        ProfileImage = roomieEntity.ProfileImage;
        Description = roomieEntity.Description;
        
        // Map the Attributes from AttributeEntity to List<string) and handle null values.
        // Check if roomieEntity.Attributes is null and handle it appropriately
        if (roomieEntity.Attributes != null)
        {
            Attributes = roomieEntity.Attributes
                .Select(attr => attr.AttributeName)
                .ToList();
        }
        else
        {
            Attributes = new List<string>(); // Or you can choose an alternative handling method
        }
    }

    public Guid Id { get; set; }
    public string ProfileImage { get; set; }
    public string Description { get; set; }
    public List<string> Attributes { get; set; }
}
