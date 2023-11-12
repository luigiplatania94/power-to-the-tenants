using PtttApi.Domain;
namespace PtttApi.Db.Entities;


public class TraitEntity
{
    public Guid Id { get; set; }
    public string TraitName { get; set; }
    public List<RoomieEntity>  Roomies { get; set; }
    
    
    // microsoft has a class called Trait that will conflict without the namespace
    public TraitEntity(Domain.Trait trait)
    {
        Id = trait.Id;
        TraitName = trait.Name;
    }

    public TraitEntity(Guid id, string traitName)
    {
        Id = id;
        TraitName = traitName;
    }
}