from requests import get

a = get("https://www.instagram.com/virat.kohli/?__a=1&__d=dis")
print(a.text)
a = get("https://www.instagram.com/p/CxLWFNksXOE/?__a=1&__d=dis")
print(a.text)