using PtttApi.Domain;

namespace PtttApi.Repositories;

public class RoomieRepository : IRoomieRepository
{
    private List<Roomie> roomies = new List<Roomie>
    {
        new Roomie
        {
            Id = new Guid("dda26589-e479-4864-b19e-70b7de9f750c"),
            ProfileImage = "https://images.unsplash.com/photo-1560807707-8cc77767d783?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMzR8MHwxfGFsbHwxfHx8fHx8fHwxNjE1OTU2MzM0&ixlib=rb-1.2.1&q=80&w=400",
            Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            Attributes = new List<string> {"Friendly", "Loves toys", "Early Bird"},
        },
        new Roomie
        {
            Id = new Guid("b51fbdda-3c1f-4c15-9477-5da7d1f47d1a"),
            ProfileImage =
                "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            Description = "Wiskers is scared of big meanie mice",
            Attributes = new List<string> { "Scared", "Playful" },
        }
    };
    
    public Roomie? GetRoomieById(Guid id)
    {
        return roomies
            .FirstOrDefault(r => r.Id == id); // LINQ first item in collection that matches this criteria or return null
    }
    
    public IEnumerable<Roomie> GetAllRoomies()
    {
        return roomies;
    }
    
    public void CreateRoomie(Roomie roomie)
    {
        roomies.Add(roomie);
    }

    public void DeleteRoomie(Guid id)
    {
        roomies.Remove(GetRoomieById(id));
    }
}