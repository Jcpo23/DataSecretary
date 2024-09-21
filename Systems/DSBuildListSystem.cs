using Game.Areas;
using Game.Buildings;
using Game.Tools;
using Game.UI;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Unity.Collections;
using Unity.Entities;
using DataSecretary;
using Colossal.IO.AssetDatabase.Internal;
using Colossal.UI.Binding;
using System.Reflection;
using Game;
using System.Collections;
using Colossal.IO.AssetDatabase;
using static Game.Modding.ModManager;
using static Game.UI.NameSystem;
using UnityEngine.InputSystem;
using Unity.Entities.UniversalDelegates;
using System.Runtime.CompilerServices;

namespace DataSecretary
{
    internal partial class DSBuildListSystem : ExtendedUISystemBase
    {
        public override GameMode gameMode => GameMode.Game;

        private EntityQuery disquery;

        private NativeArray<Entity> disArray;

        private Array IndexArray = new int[2] { 1, 1 };

        private string Indexes = "";

        private bool IsDSActive = false;

        private ValueBindingHelper<string> DisListBinding;

        protected override void OnCreate()
        {
            base.OnCreate();
            disquery = GetEntityQuery(ComponentType.ReadOnly<District>(), ComponentType.Exclude<Temp>());

            DisListBinding = CreateBinding("DisList", Indexes);

            CreateTrigger("ModActive", Activation);

        }
        protected override void OnUpdate()
        {
            base.OnUpdate();
            disArray = disquery.ToEntityArray(Allocator.Temp);

            if (IndexArray.Length != disArray.Length && IsDSActive)
            {
                GetIndexes();
                DisListBinding.Value = Indexes;
            }
        }
        protected override void OnDestroy()
        {
            disquery.Dispose();
            disArray.Dispose();
        }
        private void GetIndexes()
        {
            Indexes = "";
            IndexArray = new int[disArray.Length];
            int i = 0;
            foreach (var entity in disArray)
            {
                Indexes += entity.Index.ToString() + ",";
                IndexArray.SetValue(entity.Index, i);
                //DataSecretary.Mod.log.Info($"DistrictItem {i} = {IndexArray.GetValue(i)}.");
                i++;
            }
        }
        private void Activation()
        {
            IsDSActive = !IsDSActive;
        }
    }
}