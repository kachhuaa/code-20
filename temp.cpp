#include <bits/stdc++.h>

using namespace std;

int main()
{
    freopen("in", "r", stdin);
    freopen("out", "w", stdout);

    int n;
    cin >> n;

    for (int i = 1; i <= 10; ++i) {
        cout << n << " * " << i << " = " << n * i << endl;
    }

    return 0;
}