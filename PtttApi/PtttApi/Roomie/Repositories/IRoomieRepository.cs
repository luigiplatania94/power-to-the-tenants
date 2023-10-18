using PtttApi.Domain;
namespace PtttApi.Repositories;


public interface IRoomieRepository
{
    Roomie? GetRoomieById(Guid id);
}