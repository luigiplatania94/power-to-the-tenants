using PtttApi.Db.Entities;
using PtttApi.Domain;

namespace PtttApi.Trait.Repository;

public interface ITraitRepository
{
    Task<List<TraitEntity>> GetAllTraits();
}