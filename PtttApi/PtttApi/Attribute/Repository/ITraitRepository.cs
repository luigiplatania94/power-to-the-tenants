using PtttApi.Db.Entities;
using PtttApi.Domain;

namespace PtttApi.Attribute.Repository;

public interface ITraitRepository
{
    Task<List<TraitEntity>> GetAllAttribute();
}