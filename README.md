# pondfillers-web
Website for the pondfillers

using System;
					
public class Program
{
	public static void Main()
	{
		
		int[,] a = new int[8,8];
		int[,] b = new int[8,8];
		int n = 5;
		int m = 8;
		int nr = 0;
		
		// 5-os - Kerek
		for(int i = 0; i < Math.Ceiling((double)n / 2); i++)
			for(int j = 0; j < Math.Ceiling((double)m / 2); j++)
			{	
				nr = i < j ? i : j;
				nr = nr + 1;
				a[i,j] = nr;
				a[n - 1 -  i,j] = nr;
				a[i,m - 1 - j] = nr;
				a[n - 1 -  i,m - 1 - j] = nr;
			}
		
		// 4-es - sarkas
		for(int i = 0; i < n; i++)
			for(int j = 0; j < m; j++)
			{
				nr = i < j ? i : j;
				nr = nr + 1;
				b[i,j] = nr;
			}
		
		
		for(int i = 0; i < n; i++)
		{
			for(int j = 0; j < m; j++)
			{
				Console.Write(a[i,j]+" ");
			}
			Console.WriteLine();
		}

	}
}
