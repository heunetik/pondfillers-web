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

public class SpiralMatrix {
    public static void main (String args[]){
        int[][] mat = { {1, 2,  3,  4,  5},
                        {6, 7,  8,  9,  10},
                        {11,12, 13, 14, 15}};
        int i,n=3,m=5,r=m-1,q=n-1;
        while(q>0 && r>0){
            for(i=m-1-r;i<=r;i++){
                System.out.println(mat[m-1-r][i]);
            }
            for(i=n-1-q+1;i<=q;i++){
                System.out.println(mat[i][r]);
            }
            for(i=r-1;i>=m-1-r && q>1;i--){
                System.out.println(mat[q][i]);
            }
            for(i=q-1;i>=n-1-q+1 && r>1;i--){
                System.out.println(mat[i][n-1-q]);
            }
            q--;
            r--;
        }
    }
}
