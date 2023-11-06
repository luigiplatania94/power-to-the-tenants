using PtttApi.Domain;
namespace PtttApi.Db.Entities;


public class AttributeEntity
{
    public Guid Id { get; set; }
    public string AttributeName { get; set; }
    
    
    // microsoft has a class called Attribute that will conflict without the namespace
    public AttributeEntity(RoomieAttribute roomieAttribute)
    {
        Id = roomieAttribute.Id;
        AttributeName = roomieAttribute.Name;
    }

    public AttributeEntity(Guid id, string attributeName)
    {
        Id = id;
        AttributeName = attributeName;
    }
}