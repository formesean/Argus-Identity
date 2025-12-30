using Argus.Sync.Extensions;
using Argus.Sync.Data.Models;
using ArgusIdentity.Indexer.Data;
using ArgusIdentity.Indexer.Models;
using ArgusIdentity.Indexer.Reducers;
using ArgusIdentity.Indexer;

var builder = Host.CreateApplicationBuilder(args);

// Argus Indexer
builder.Services.AddCardanoIndexer<IdentityDbContext>(builder.Configuration);

// Reducers
builder.Services.AddReducers<IdentityDbContext, IReducerModel>(builder.Configuration);

var host = builder.Build();
host.Run();
