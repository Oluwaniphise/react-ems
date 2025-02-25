import { supabase } from './supabase';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useFetchAllTasksForAdmin = (userId) => {
  return useQuery({
    queryKey: ['Tasks', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Tasks')
        .select('*')

      if (error) throw new Error(error.message);
      return data;
    }
  });
};

export const useFetchIndividualTasks = (userId) => {
  return useQuery({
    queryKey: ['Tasks', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Tasks')
        .select('*')
        .eq('assigned_to', userId);

      if (error) throw new Error(error.message);
      return data;
    }
  });
};

export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskData) => {
      const { data, error } = await supabase.from('Tasks').insert([taskData]);
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(['Tasks'])
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ taskId, updates }) => {
      const { data, error } = await supabase
        .from('Tasks')
        .update(updates)
        .eq('id', taskId);

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(['Tasks'])
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskId) => {
      const { error } = await supabase.from('Tasks').delete().eq('id', taskId);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => queryClient.invalidateQueries(['Tasks'])
  });
};