using PtttApi.Db.Entities;

namespace PtttApi.Domain;

public class Trait
{
    public Guid Id { get; set; }
    public string Name { get; set; }

    public Trait(TraitEntity traitEntity)
    {
        Id = traitEntity.Id;
        Name = traitEntity.TraitName;
    }
}