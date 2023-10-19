using PtttApi.Domain;
namespace PtttApi.Repositories;


public interface IRoomieRepository
{
    Roomie? GetRoomieById(Guid id);
    void CreateRoomie(Roomie roomie);
    void DeleteRoomie(Guid id);
}