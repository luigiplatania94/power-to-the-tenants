using PtttApi.Db.Entities;

namespace PtttApi.Domain;

public class RoomieAttribute
{
    public Guid Id { get; set; }
    public string Name { get; set; }

    public RoomieAttribute(AttributeEntity attributeEntity)
    {
        Id = attributeEntity.Id;
        Name = attributeEntity.AttributeName;
    }
}