using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PatientDoctorManagementApp
{
    public class ConnectionMapping
    {
        private readonly Dictionary<Guid, string> _connections = new Dictionary<Guid, string>();

        public int Count
        {
            get
            {
                return _connections.Count;
            }
        }

        public void Add(Guid key, string connectionId)
        {
            lock(_connections)
            {
                _connections[key] = connectionId;
            }
        }

        public string GetConnection(Guid key)
        {
            string connection;
            _connections.TryGetValue(key, out connection);

            return connection;
        }

        //public void Remove(Guid key, string connectionId)
        //{
        //    lock (_connections)
        //    {
        //        HashSet<string> connections;
        //        if (!_connections.TryGetValue(key, out connections))
        //        {
        //            return;
        //        }

        //        lock (connections)
        //        {
        //            connections.Remove(connectionId);

        //            if (connections.Count == 0)
        //            {
        //                _connections.Remove(key);
        //            }
        //        }
        //    }
        //}
    }
}
